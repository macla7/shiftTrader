# README

## CURRENT TODO's

- a post screen. This will allow for clearer view. Like facebook. It will show comments below, and then a comment form just above the tab navbar. I reckon we also allow the dual area (with bids and shift) to be flexible and have a max height twice that of on the home/groups screen.
- comments
  - In the middle of making comments form.. format tweaking etc.
  - create.. life...
- push notifications
  - seems the way to go will be the expo push notification package.. but since to test it all properly it'll require a paid Apple developer account (apparently), I'm going to push this one toward the end.
- Icons needed:
  - Hourglass for time left / stopwatch
  - comment
  - heart
  - bid (got already?)
  - pencil for editing (?)

**Twilio (phone) verification**

**Create facebook/instagram login support, omniauth(?)**

**Get mailer supported for password forget, signup, and reciept of purchasse of shift**

**Create Banking functionality....**

- watch Deain part 15 and 16 videos at double pace.
- research into Stripe
- research into pay gem

**Relevant Deanin videos I want to watch**

- Intro to Rich Comments in Rails 7
- Setup Devise Confirmable and MailCatcher
- Deplo a Rails 7 App To Heroku ..? No Free tier anymore so not sure if it's the way.
- N+1 Query And Performance Optizizations
- Devise Onboarding with Wicked Gem
- Monethly Subscriptions with Stripe and Pay Gem
- The VSCODe Rails Extentions Used in This Series
- Notificaiton Sounds when Messages are Sent in Chat

**Misc Known Issues**

- the cache of user on index from post controller.
- Atm, if blueprint is made, and for some reason notifications and notificationOrigins aren't.. it won't throw any kind of exception. Is this end of the world..? Not ideal, at least. Fails silently.
- Random long logs on image upload
- db protection against lower bids ... ? (Not super necessary, just really doesn't make sense.. won't effect who wins tho)

**Non MVP features**

- Limit retrieved notifications, and then just have a 'view more' to retrieve the next older batch.
- follow posts ( followers (?))
- Viewed (Shows number of views on posts)
- DB protections to stop duplicate memberships.
- Ejecting from Expo?
- Using variable font?
- Maybe 10 or so default DP's to choose from
- Reacts (likes and what not)

**Do README**

## Design Notes

**To get the API signin / signup working, I follow Deanin's videos:**

- [Devise API](https://www.youtube.com/watch?v=PqizV5l1yFE&ab_channel=Deanin)
- [Doorkeeper API (devise also..)](https://www.youtube.com/watch?v=Kwm4Edvlqhw&ab_channel=Deanin)

But the following articles helped even more I reckon

- [This guide](https://rubyyagi.com/rails-api-authentication-devise-doorkeeper/) seems to be basially what he built his doorkeerer video off. Also it can be found in the guides in doorkeeper gem on github
- Followed only some parts of [this guide](https://www.bluebash.co/blog/rails-6-7-api-authentication-with-jwt/), roughly, to get my JWT up and running.

**Other articles and notes**

- Invites is the trickest of my tables.. There is a boolean "request" that essentially determines whether the invite was sent to an external user, or requested by an external user. This means the API and controller is a bit more clunky.
- For notifications, primairly followed [this guide](https://tannguyenit95.medium.com/designing-a-notification-system-1da83ca971bc) but changed a fair amount of the naming.
- [Deanin video](https://www.youtube.com/watch?v=_rLMRd676-I&ab_channel=Deanin) that helped get me off the ground re avatar upload to api from react frontend. Articles he uses are in the comments.
- To store my JWT cookies in native app, using [SecureStore from Expo](https://docs.expo.dev/versions/latest/sdk/securestore/)

**React DateTimePicker**

-[Docs here](https://github.com/react-native-datetimepicker/datetimepicker)

**LinearGradient in Expo**

-[Docs here](https://docs.expo.dev/versions/latest/sdk/linear-gradient/#usage)

**React Native SVG**

-[Docs here](https://github.com/react-native-svg/react-native-svg#use-with-svg-files)

- Need the [transformer](https://github.com/kristerkari/react-native-svg-transformer#installation-and-configuration) too if importing from files.

**ActionCable**

- [This guide](https://dev.to/tegandbiscuits/using-action-cable-with-react-native-jk0) helped me a fair bit get the code implemented.
- The [ActionCable](https://guides.rubyonrails.org/action_cable_overview.html) docs themselves also helped a fair bit.
- Probably a big TODO with production is to figure out / learn how it'll work if I use redis to implement it, which seems to be the way most guides do. Atm development I've just revereted back to 'async'. So I don't have to manually start some redis server I don't know much about.
- [This](https://www.youtube.com/watch?v=NwQEZXnVXJ8&ab_channel=SaloniMehta) video was also pretty good in terms of high level example of what was going on. Don't try to implement the details tho..

**BIG ISSUES BEATEN**

- Spent probably all day, 5+hrs, trying to get fonts to work by customising react native base themes. What seemed to fix it in the end was a version update of 'native-base' itself using 'yarn upgrade native-base'..
- Now it seems native-base doesn't like it if I try to set a customer font-Weight..
- Uploading images via expo image picker, using form data as per [this SO Post](https://stackoverflow.com/a/46740071/17632294)
