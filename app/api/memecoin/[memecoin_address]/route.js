import { connectToDB } from '@/utils/database';
import Memecoin from '@/models/memecoin';
import User from '@/models/user';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const memecoins = await Memecoin.aggregate([
      { $match: { memecoin_address: params.memecoin_address } },
      { $lookup: {
        from: User.collection.name,
        localField: 'creator_address',
        foreignField: 'address',
        as: 'creator'
      }},
      { $unwind: { path: '$creator', preserveNullAndEmptyArrays: true } } // Optionally, keep memecoin even if no user found
    ]);

    if (!memecoins || memecoins.length === 0) {
      return new Response(JSON.stringify({ message: 'Memecoin not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(memecoins[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch memecoin', { status: 500 });
  }
};
