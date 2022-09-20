# README

## CURRENT TODO's

- db protection against duplicate user (perhaps from touching action twice and sending two accept invite requests before the notification disappears).
- Functionality to accept requests to groups (notification action + in group details somewhere)
- Makes group 'feed' just like home's.
- Make notifications area consistent with theme.
- Likes
- Comments
- actions on notifications
- Convert shift form to just have an 'hours' field, or something like that.. where you can write '5' for example, and it'll auto calculate the end of the shift.

**Create Banking functionality....**

**Twilio (phone) verification**

**Create facebook/instagram login support, omniauth(?)**

**Relevant Deanin videos I want to watch**

- Intro to Rich Comments in Rails 7
- Setup Devise Confirmable and MailCatcher
- Deplo a Rails 7 App To Heroku
- N+1 Query And Performance Optizizations
- Devise Onboarding with Wicked Gem
- Update User Accounts in React, Edit Account
- Monethly Subscriptions with Stripe and Pay Gem
- The VSCODe Rails Extentions Used in This Series
- Notificaiton Sounds when Messages are Sent in Chat

**Misc Known Issues**

- the cache of user on index from post controller.
- Atm, if blueprint is made, and for some reason notifications and notificationOrigins aren't.. it won't throw any kind of exception. Is this end of the world..? Not ideal, at least. Fails silently.
- Random long logs on image upload
- Shift props bug when you create post.. atm need to reload to fix

**Non MVP features**

- Limit retrieved notifications, and then just have a 'view more' to retrieve the next older batch.
- follow posts ( followers (?))
- Viewed (Shows number of views on posts)
- Notifications suscribing to some sort of websocket(?), so as to listen for them?

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

**React Hook Form**

- [This video](https://www.google.com/search?q=creating+forms+in+react+native&sxsrf=ALiCzsaQdOyFOhyqEkuACwNJu1xcdAioHQ%3A1656798694035&ei=5r3AYq3qAaO34t4PoLuroA4&ved=0ahUKEwit9fyMmNv4AhWjm9gFHaDdCuQQ4dUDCA4&uact=5&oq=creating+forms+in+react+native&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgYIABAeEBYyBggAEB4QFjoHCAAQRxCwAzoKCAAQ5AIQsAMYAToICAAQHhAWEApKBAhBGABKBAhGGAFQ6gFYxglgjgtoAXABeACAAc0EiAGjCpIBBzMtMS4xLjGYAQCgAQHIAQ3AAQHaAQYIARABGAk&sclient=gws-wiz#kpvalbx=_rtzEYsyhEoSXseMPl8iGyAc16) helped me implement react hook form for login component, seemingly right before I replaced it with react naviagation.

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
