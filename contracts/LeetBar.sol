// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// LeetBar is the coolest bar in town. You come in with some Leet, and leave with more! The longer you stay, the more Leet you get.
//
// This contract handles swapping to and from xLeet, LeetSwap's staking token.
contract LeetBar is ERC20("LeetBar", "xLEET") {
    using SafeMath for uint256;
    IERC20 public leet;

    // Define the Leet token contract
    constructor(IERC20 _leet) public {
        leet = _leet;
    }

    // Enter the bar. Pay some LEETs. Earn some shares.
    // Locks Leet and mints xLeet
    function enter(uint256 _amount) public {
        // Gets the amount of Leet locked in the contract
        uint256 totalLeet = leet.balanceOf(address(this));
        // Gets the amount of xLeet in existence
        uint256 totalShares = totalSupply();
        // If no xLeet exists, mint it 1:1 to the amount put in
        if (totalShares == 0 || totalLeet == 0) {
            _mint(msg.sender, _amount);
        }
        // Calculate and mint the amount of xLeet the Leet is worth. The ratio will change overtime, as xLeet is burned/minted and Leet deposited + gained from fees / withdrawn.
        else {
            uint256 what = _amount.mul(totalShares).div(totalLeet);
            _mint(msg.sender, what);
        }
        // Lock the Leet in the contract
        leet.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the bar. Claim back your LEETs.
    // Unlocks the staked + gained Leet and burns xLeet
    function leave(uint256 _share) public {
        // Gets the amount of xLeet in existence
        uint256 totalShares = totalSupply();
        // Calculates the amount of Leet the xLeet is worth
        uint256 what = _share.mul(leet.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        leet.transfer(msg.sender, what);
    }
}
