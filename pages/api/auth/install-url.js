import { withIronSessionApiRoute } from 'iron-session/next';
import { getInstallURL } from '../../../lib/zoom-api';
import { sessionOptions } from '../../../lib/session';

async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url, state, verifier } = getInstallURL();
    
    req.session.state = state;
    req.session.verifier = verifier;
    await req.session.save();

    return res.status(200).json({ redirectUrl: url.href });
  } catch (error) {
    console.error('Error generating install URL:', error);
    return res.status(500).json({ error: 'Failed to generate install URL' });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
