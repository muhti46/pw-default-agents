@regression
Feature: Your Details and Security

  Background:
    Given I am signed in to ZincBank

  @smoke
  Scenario: H1 - See my personal details
    When I open the profile page
    Then I should see my personal details

  Scenario: H2 - Change my personal details
    When I open the profile page
    And I update my phone number
    Then my phone number should be updated

  Scenario: H2 - Email address cannot be changed
    When I open the profile page
    Then the email field should be disabled

  Scenario: H3 - Change my password
    When I open the profile page
    Then I should see the change password form

  Scenario: H4 - Signed out visitor cannot access private pages
    Given I am signed out
    When I try to access the dashboard
    Then I should be redirected to the login page
