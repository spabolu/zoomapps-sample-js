import { withIronSessionApiRoute } from 'iron-session/next';
import { getToken, getDeeplink } from '../../../lib/zoom-api';
import { sessionOptions } from '../../../lib/session';

async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { code, state } = req.query;

    // Validate code and state
    if (!code || typeof code !== 'string' || code.length < 32 || code.length > 64) {
      return res.status(400).json({ error: 'Invalid code parameter' });
    }

    if (!state || typeof state !== 'string' || state !== req.session.state) {
      return res.status(400).json({ error: 'Invalid state parameter' });
    }

    // Clear the state from session
    req.session.state = null;
    const verifier = req.session.verifier;
    req.session.verifier = null;
    await req.session.save();

    // Get token from Zoom
    const { access_token: accessToken } = await getToken(code, verifier);

    // Get deeplink
    const deeplink = await getDeeplink(accessToken);

    return res.status(200).json({ deeplink });
  } catch (error) {
    console.error('Error during auth callback:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
