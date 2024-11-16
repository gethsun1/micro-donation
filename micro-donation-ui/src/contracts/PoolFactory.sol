// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PoolFactory is ReentrancyGuard {
    struct Pool {
        address creator;
        uint256 targetAmount;
        uint256 totalRaised;
        uint256 deadline;
        bool isActive;
        address[] contributors;
    }

    mapping(uint256 => Pool) public pools;
    mapping(address => uint256) public contributions; // Track contributions by address
    uint256 public poolCount;

    event PoolCreated(uint256 indexed poolId, address indexed creator, uint256 targetAmount, uint256 deadline);
    event ContributionMade(uint256 indexed poolId, address indexed contributor, uint256 amount);
    event FundsWithdrawn(uint256 indexed poolId, address indexed creator, uint256 amount);
    event RefundIssued(uint256 indexed poolId, address indexed contributor, uint256 amount);

    // Create a new pool
    function createPool(uint256 targetAmount, uint256 duration) external {
        require(duration >= 1 days, "Duration must be at least 1 day");
        pools[poolCount] = Pool({
            creator: msg.sender,
            targetAmount: targetAmount,
            totalRaised: 0,
            deadline: block.timestamp + duration,
            isActive: true,
            contributors: new address 
   });
        emit PoolCreated(poolCount, msg.sender, targetAmount, block.timestamp + duration);
        poolCount++;
    }

    // Contribute to a pool
    function contribute(uint256 poolId, uint256 amount) external payable {
        require(pools[poolId].isActive, "Pool is not active");
        require(msg.value == amount, "Incorrect contribution amount");

        pools[poolId].totalRaised += amount;
        pools[poolId].contributors.push(msg.sender);
        contributions[msg.sender] += amount;

        emit ContributionMade(poolId, msg.sender, amount);
    }

    // Withdraw funds (pool owner only)
    function withdraw(uint256 poolId) external nonReentrant {
        Pool storage pool = pools[poolId];
        require(msg.sender == pool.creator, "Only creator can withdraw");
        require(pool.totalRaised >= pool.targetAmount, "Target not met");
        require(block.timestamp > pool.deadline, "Deadline not reached");
        require(pool.isActive, "Pool already closed");

        pool.isActive = false;
        uint256 amount = pool.totalRaised;
        payable(msg.sender).transfer(amount);

        emit FundsWithdrawn(poolId, msg.sender, amount);
    }

    // Refund (if target not met)
    function refund(uint256 poolId) external nonReentrant {
        Pool storage pool = pools[poolId];
        require(block.timestamp > pool.deadline, "Deadline not reached");
        require(pool.totalRaised < pool.targetAmount, "Target reached");

        uint256 amount = contributions[msg.sender];
        require(amount > 0, "No contributions to refund");

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit RefundIssued(poolId, msg.sender, amount);
    }

    // Fallback function
    receive() external payable {
        revert("Direct Ether transfers not allowed");
    }
}
