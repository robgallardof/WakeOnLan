// pages/api/wake.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { wake } from 'node-wol';

type Data = {
  success: boolean;
  message: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { macAddress } = req.body;
    if (!macAddress) {
      res.status(400).json({ success: false, message: 'MAC address is required' });
      return;
    }

    wake(macAddress, {}, (err: Error | null) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Failed to send WoL packet' });
        return;
      }
      res.status(200).json({ success: true, message: 'WoL packet sent successfully' });
    });
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
