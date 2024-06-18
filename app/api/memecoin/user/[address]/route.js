import { connectToDB } from '@/utils/database';
import Memecoin from '@/models/memecoin';
import User from '@/models/user';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const memecoins = await Memecoin.find({ creator_address: params.address })
      .sort({ timestamp: -1 });
    
    if (!memecoins || memecoins.length === 0) return new Response('Memecoins not found', { status: 404 });

    return new Response(JSON.stringify(memecoins), { 
      status: 200
    });

  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch memecoins', { status: 500 });
  }
};
