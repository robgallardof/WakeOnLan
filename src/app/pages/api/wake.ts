import type { NextApiRequest, NextApiResponse } from 'next';
import wol from 'wake-on-lan';

type Data = {
  success: boolean;
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { macAddress } = req.body;

    if (!macAddress) {
      res.status(400).json({ success: false, message: 'MAC address is required' });
      return;
    }

    const isValidMacAddress = (address: string) => {
      const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
      return macRegex.test(address);
    };

    if (!isValidMacAddress(macAddress)) {
      res.status(400).json({ success: false, message: 'Invalid MAC address format' });
      return;
    }

    wol.wake(macAddress, { address: '192.168.3.255', port: 9 }, (err) => {
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