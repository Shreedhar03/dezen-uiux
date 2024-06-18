import { connectToDB } from '@/utils/database';
import Memecoin from '@/models/memecoin';
import User from '@/models/user';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    // Using aggregation to fetch all memecoins and join with the User data
    const memecoins = await Memecoin.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $lookup: {
          from: User.collection.name, // Ensures the correct collection name
          localField: 'creator_address', // Field from Memecoin
          foreignField: 'address', // Corresponding field from User
          as: 'creator' // Array of matching User documents
        }
      },
      { $unwind: { path: '$creator', preserveNullAndEmptyArrays: true } } // Optional: keep memecoins even if no user found
    ]);

    if (!memecoins || memecoins.length === 0) {
      return new Response(JSON.stringify({ message: 'No memecoins found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(memecoins), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch memecoins', { status: 500 });
  }
};
