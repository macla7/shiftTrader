# README

## CURRENT TODO's

**Create Shift model**

- Make shift visible with post

**Notifications**

- Accept Invites to groups, action -> accept
- Someone bid on your post, action -> view post
- Someone liked your post, action -> view post
- Someone posted in a group you're in, action -> view group
- A post you've bid on is ending soon, action -> view
- Someone bid on a post you've bid on, action -> view post

**Create DP functionality**

**Create React Native App**

**Create Banking functionality....**

**Create facebook login support**

**Do README**

## Design Notes

**To get the API signin / signup working, I follow Deanin's videos:**

- [Devise API](https://www.youtube.com/watch?v=PqizV5l1yFE&ab_channel=Deanin)
- [Doorkeeper API (devise also..)](https://www.youtube.com/watch?v=Kwm4Edvlqhw&ab_channel=Deanin)

**But the following articles helped me even more:**

- [This guide](https://rubyyagi.com/rails-api-authentication-devise-doorkeeper/) seems to be basially what he built his doorkeerer video off. Also it can be found in the guides in doorkeeper gem on github
- Followed only some parts of [this guide](https://www.bluebash.co/blog/rails-6-7-api-authentication-with-jwt/), roughly, to get my JWT up and running.

- Invites is the trickest of my tables.. There is a boolean "request" that essentially determines whether the invite was sent to an external user, or requested by an external user. This means the API and controller is a bit more clunky.
