// server-oauth1.ts
import "dotenv/config";
import express from "express";
import cookieSession from "cookie-session";
import { TwitterApi } from "twitter-api-v2";

/**
 * ENV required:
 *  PORT=8787
 *  SESSION_SECRET=change-me
 *  X_API_KEY=...
 *  X_API_SECRET=...
 *  CALLBACK_URL=http://localhost:8787/auth/callback
 *  TARGET_HANDLE=RomeProtocol
 */

const app = express();

// JSON + simple session cookie (httpOnly)
app.use(express.json());
app.use(
  cookieSession({
    name: "rome.sid",
    keys: [process.env.SESSION_SECRET || "dev-secret"],
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })
);

const appKey = process.env.X_API_KEY!;
const appSecret = process.env.X_API_SECRET!;
const CALLBACK_URL = process.env.CALLBACK_URL!;
const TARGET_HANDLE = (process.env.TARGET_HANDLE || "RomeProtocol").replace(/^@/, "");

function requireLogin(req: any, res: any, next: any) {
  if (!req.session?.user) return res.status(401).json({ error: "not_authenticated" });
  next();
}

// 1) Start OAuth 1.0a dance
app.get("/auth/login", async (req: any, res) => {
  try {
    const client = new TwitterApi({ appKey, appSecret });
    const { url, oauth_token, oauth_token_secret } =
      await client.generateAuthLink(CALLBACK_URL);
    req.session.oauth = { token: oauth_token, secret: oauth_token_secret };
    res.redirect(url);
  } catch (e: any) {
    console.error("login error:", e?.data || e);
    res.status(500).json({ error: "oauth_request_token_failed", detail: e?.data || String(e) });
  }
});

app.get("/auth/callback", async (req: any, res) => {
  try {
    const { oauth_token, oauth_verifier } = req.query as any;
    const saved = req.session.oauth;
    if (!saved || saved.token !== oauth_token) return res.status(400).send("Bad OAuth session");

    const tempClient = new TwitterApi({
      appKey,
      appSecret,
      accessToken: saved.token,
      accessSecret: saved.secret,
    });

    const { accessToken, accessSecret, userId, screenName } =
      await tempClient.login(oauth_verifier);

    req.session.user = { accessToken, accessSecret, id: userId, username: screenName };
    req.session.oauth = undefined;
    res.redirect("/");
  } catch (e: any) {
    console.error("callback error:", e?.data || e);
    res.status(500).json({ error: "oauth_access_token_failed", detail: e?.data || String(e) });
  }
});


// optional: logout
app.post("/auth/logout", (req: any, res) => {
  req.session = null;
  res.json({ ok: true });
});

// handy: who am I?
app.get("/api/me", (req: any, res) => {
  res.json({ me: req.session?.user || null });
});

// 3) Verify: typed handle must equal signed-in username AND follow @TARGET_HANDLE
app.get("/api/verify-follow", requireLogin, async (req: any, res) => {
  const input = String(req.query.inputHandle || "").replace(/^@/, "").toLowerCase();
  const user = req.session.user;

  if (user.username.toLowerCase() !== input) {
    return res.json({
      ok: false,
      reason: "handle_mismatch",
      message: `You're signed in as @${user.username}. Enter that same handle to verify.`,
    });
  }

  const authed = new TwitterApi({
    appKey,
    appSecret,
    accessToken: user.accessToken,
    accessSecret: user.accessSecret,
  });

  // get target user id via v2
  const target = await authed.v2.userByUsername(TARGET_HANDLE);
  const targetId = target.data?.id;
  if (!targetId) return res.json({ ok: false, reason: "target_not_found" });

  // v1.1 friendship endpoint is the simplest way to check relationship
  const rel = await authed.v1.friendship({ source_id: user.id, target_id: targetId });
  const follows = rel.relationship?.source?.following === true;

  res.json({ ok: follows, reason: follows ? "verified" : "not_following", me: { username: user.username } });
});

const PORT = Number(process.env.PORT) || 8787;
app.listen(PORT, () => console.log(`OAuth1 server running: http://localhost:${PORT}`));
