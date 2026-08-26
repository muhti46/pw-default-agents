Feature: Your Money at a Glance

  Background:
    Given I am signed in to ZincBank

  @smoke @regression
  Scenario: C1 - Dashboard is the first thing shown after signing in
    Then I should see the dashboard with a welcome message

  @regression
  Scenario: C2 - Total deposit balance is shown at a glance
    Then I should see my total deposit balance

  @regression
  Scenario: C3 - Credit card is shown on the dashboard
    Then I should see my credit card on the dashboard

  @regression
  Scenario: C4 - Recent activity is shown on the dashboard
    Then I should see the recent activity section

  @smoke @regression
  Scenario: C5 - Quick transfer shortcut is available
    When I click the quick transfer shortcut
    Then I should be taken to the move money page
