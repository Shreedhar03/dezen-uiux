"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import AnimateOnRouteChange from "@/components/AnimateOnRouteChange";
// import AnimateOnRouteChange from "../components/AnimateOnRouteChange";

interface User {
  address: string;
  username: string;
  profilePicture?: string;
  bio?: string;
}

interface Memecoin {
  memecoin_address: string;
  creator_address: string;
  logo: string;
  name: string;
  ticker: string;
  description: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  timestamp: Date;
  creator: User;
}
export default function Home() {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchMemecoins = async () => {
      try {
        const response = await fetch("/api/memecoin/all/f");
        const data = await response.json();
        console.log("Memecoins: ", data);
        setMemecoins(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemecoins();
  }, []);

  return (
    <AnimateOnRouteChange>
      <div className="home-container">
        {/* Your existing content */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quod
        adipisci a nulla vero blanditiis temporibus, recusandae sequi rem, iste
        ipsam iure sit! Blanditiis, ducimus earum assumenda vel eligendi nihil
        ea molestias quia nemo sed, hic cum beatae, optio maxime ut enim?
        Similique perferendis ut ducimus dicta quisquam repellendus illo
        doloremque dolor dolorum. In est error cum nobis quod consectetur,
        repudiandae vel atque tempora numquam placeat dicta ipsam quas neque
        nihil laboriosam? Voluptatem, expedita consequatur consectetur beatae
        voluptate aliquam nostrum commodi officia blanditiis fugit delectus!
        Temporibus perspiciatis veritatis quos accusantium minus earum
        praesentium reprehenderit! Assumenda expedita nemo vel eos accusamus
        perferendis, mollitia et nisi ex temporibus in sunt distinctio
        recusandae perspiciatis velit eius alias iusto animi, inventore nobis
        modi saepe? Eius natus fugit aut. Cum, sed corrupti. Nesciunt impedit
        quae quibusdam omnis incidunt suscipit autem excepturi. Error magni,
        dignissimos ab quas perferendis eum dolorem, deserunt architecto
        cupiditate iusto quos. Aliquam ullam laudantium quo enim, beatae
        similique nobis esse amet. Nam sapiente, corrupti id qui odit, dolore
        ipsa doloribus eligendi nostrum aliquam nobis iste molestiae nihil
        fugiat sint ex ducimus pariatur aperiam sit quas nulla mollitia. Eaque
        eligendi sequi dicta accusamus qui nam repellat fugiat veniam laudantium
        ea expedita, cupiditate, asperiores magni saepe, error hic praesentium.
        Harum doloremque aliquam cupiditate commodi soluta. Expedita molestias
        ducimus dignissimos nesciunt laudantium saepe exercitationem unde aut,
        facilis suscipit odio, similique ipsa incidunt quisquam vitae illo alias
        mollitia officiis facere. Asperiores, cumque veniam deleniti voluptates
        necessitatibus aliquid, voluptatem illo facere animi optio eaque, ipsum
        sapiente consectetur itaque et delectus earum architecto culpa a commodi
        ullam! Accusamus eum explicabo quam veritatis possimus quisquam nemo!
        Animi accusantium minima itaque, veritatis, numquam quo facere molestiae
        laudantium expedita dolorum eius, recusandae eaque iure sequi sapiente
        minus. Nostrum adipisci dolor, quasi, vitae laudantium aperiam iusto
        perspiciatis veniam explicabo odio in dignissimos.
      </div>
    </AnimateOnRouteChange>
  );
}
