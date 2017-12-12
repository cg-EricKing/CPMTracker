// If CPM > 1.25, sort by .50 intervals. If they can be listed from highest CPM to lowest, then I can know which accounts 
// to focus on first.

// cpm = cost per thousand impressions

// Build a script to look at the last 14 days and pull the average CPM cost from the list of placements. 
// Eliminate anything > $5 and then bid down by .50 intervals.

// setCpm()
// Sets the Cpm bid for this ad group
// Please note that although this method will effectively set the Cpm bid for this
// ad groun, the change may have no effect on actual bidding if this ad group
// has a bidding strategy which does not involve cpm bids.
// CPM Tracking Script

// Implement 50+ workaround eventually
// Select the account
// Get stats for last 14 days
// Grab Avg. Cpm
// Conditional to check if cpm is over 1.25
// Get clarification on Eliminate anything over $5
// If it is bid down .50 intervals
// else log okay message


function main() {
    var currentAccount = AdWordsApp.currentAccount();
    var currentAccountName = currentAccount.getName();
    var cpmCheck = 1.25;
    var bidDownOnce = currentCpm - .50;
    var bidDownTwice = currentCpm - 1.00;
    var cpmAboveAverage = 3.00;
    var maxCpm = 5.00;
    
    var campaignIterator = AdWordsApp.campaigns().get();

    while(campaignIterator.hasNext()) {
        var campaign = campaignIterator.next();
        Logger.log("Account - " + currentAccountName);
        Logger.log("Campaign Name: " + campaign.getName());

        var cpmStats = campaign.getStatsFor("LAST_14_DAYS");
        var currentCpm = cpmStats.getAverageCpm();
        Logger.log("Average CPM for last 14 days: " + currentCpm);

        var currentBiddingStrategy = campaign.getBiddingStrategyType();
        Logger.log("Current bidding strategy: " + currentBiddingStrategy);

        //Ad Groups selector
        var adGroupSelector = AdWordsApp
            .adGroups()
            .forDateRange("LAST_14_DAYS");
        var adGroupIterator = adGroupSelector.get();
        while(adGroupIterator.hasNext()) {
            var adGroup = adGroupIterator.next();
            Logger.log("Ad Group Name: " + adGroup.getName());
        }
    }

    if(currentBiddingStrategy === "MANUAL_CPM") {
        if(currentCpm >= cpmCheck && currentCpm < cpmAboveAverage) {
            Logger.log("CPM is greater than $1.25 and under the max");
            // setCpm() - adGroup.setCpm(bidDownOnce);
        }   else if(currentCpm > cpmAboveAverage && currentCpm < maxCpm) {
            Logger.log("CPM is above average - bidding down by $1.00");
            // setCpm() - adGroup.setCpm(bidDownTwice);
        }
            else if(currentCpm > maxCpm) {
            // NOTIFY
            Logger.log("CPM IS ABOVE $5");
        }
         else {
            Logger.log("Current CPM is lower than $1.25");
        }
    }


}