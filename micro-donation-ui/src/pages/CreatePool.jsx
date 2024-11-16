import React, { useState } from "react";
import { ethers } from "ethers";

import contractABI from "../contracts/PoolFactory.json";
import contractAddress from "../contracts/contractAddress";


const CreatePool = () => {
  const [targetAmount, setTargetAmount] = useState("");
  const [duration, setDuration] = useState("");

  const handleCreatePool = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.createPool(
        ethers.utils.parseEther(targetAmount),
        duration
      );
      await tx.wait();
      alert("Pool created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating pool.");
    }
  };

  return (
    <div>
      <h1>Create a Pool</h1>
      <input
        type="text"
        placeholder="Target Amount (ETH)"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={handleCreatePool}>Create Pool</button>
    </div>
  );
};

export default CreatePool;
