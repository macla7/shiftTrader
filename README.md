# README

## CURRENT TODO's

**Notifications**

- (user.invites.nots) (user) Accept Invites to groups, action -> accept
- (user.posts.nots) (post) Someone bid on your post, action -> view post
- (user.posts.nots) (user) Someone liked your post, action -> view post
- (user.groups.nots) (group) Someone posted in a group you're in, action -> view group
- (user.bids.posts.nots ??) A post you've bid on is ending soon, action -> view
- (user.bids.posts.nots ??) Someone bid on a post you've bid on, action -> view post
- (user.groups.invites.nots) Someone has requested to join group you're in, action -> accept

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
