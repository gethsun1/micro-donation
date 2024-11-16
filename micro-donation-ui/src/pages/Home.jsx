import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import PoolCard from "../components/PoolCard";

import contractABI from "../contracts/PoolFactory.json";
import contractAddress from "../contracts/contractAddress";

const Home = () => {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPools = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const poolCount = await contract.poolCount();
    const poolData = [];
    for (let i = 0; i < poolCount; i++) {
      const pool = await contract.pools(i);
      poolData.push({ ...pool, id: i });
    }
    setPools(poolData);
    setLoading(false);
  };

  useEffect(() => {
    fetchPools();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Active Pools</h1>
      {pools.map((pool) => (
        <PoolCard key={pool.id} pool={pool} />
      ))}
    </div>
  );
};

export default Home;
