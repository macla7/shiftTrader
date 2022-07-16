# README

## CURRENT TODO's

- Edit DP functionality, which leads into the next one.
- Edit User profile, and..
- react native image picker for dp on phone?
- A User profile lol
- Follow guide for making customer scroll with snapInterval etc

**Create React Native App**

**Create Banking functionality....**

**Twilio (phone) verification**

**Create facebook/instagram login support, omniauth(?)**

**Misc Known Issues**

- the cache of user on index from post controller.
- Atm, if blueprint is made, and for some reason notifications and notificationOrigins aren't.. it won't throw any kind of exception. Is this end of the world..? Not ideal, at least.

**Non MVP features**

- comments
- Limit retrieved notifications, and then just have a 'view more' to retrieve the next older batch.
- actions on notifications
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

**BIG ISSUES BEATEN**

- Spent probably all day, 5+hrs, trying to get fonts to work by customising react native base themes. What seemed to fix it in the end was a version update of 'native-base' itself using 'yarn upgrade native-base'..
- Now it seems native-base doesn't like it if I try to set a customer font-Weight..
