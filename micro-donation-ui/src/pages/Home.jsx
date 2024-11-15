import React from "react";
import PoolCard from "../components/PoolCard";

const Home = () => {
    const donationPools = [
        { title: "Education for All", description: "Support underprivileged children.", totalDonations: "$500" },
        { title: "Clean Water", description: "Help provide clean water.", totalDonations: "$300" },
        { title: "Healthcare Fund", description: "Support community health programs.", totalDonations: "$800" },
    ];

    return (
        <div className="container mx-auto mt-12">
            <h1 className="text-2xl font-bold">Donation Pools</h1>
            <div className="pool-grid">
                {donationPools.map((pool, index) => (
                    <PoolCard key={index} {...pool} />
                ))}
            </div>
        </div>
    );
};

export default Home;
