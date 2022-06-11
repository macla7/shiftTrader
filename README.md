# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...

To get the API signin / signup working, I follow Deanin's videos:

<ul>
  <li><a href="https://www.youtube.com/watch?v=PqizV5l1yFE&ab_channel=Deanin" target="_blank">Devise API</a></li>
  <li><a href="https://www.youtube.com/watch?v=Kwm4Edvlqhw&ab_channel=Deanin" target="_blank">Doorkeeper API (devise also..)</a></li>
</ul>
But the following articles helped me even more:
<ul>
  <li><a href="https://rubyyagi.com/rails-api-authentication-devise-doorkeeper/" target="_blank">This guide</a> seems to be basially what he built his doorkeerer video off. Also it can be found in the guides in doorkeeper gem on github</li>
  <li>Followed only some parts of <a href="https://www.bluebash.co/blog/rails-6-7-api-authentication-with-jwt/" target="_blank">this</a>, roughly, to get my JWT up and running.</li>
</ul>

Invites is the trickest of my tables.. There is a boolean "request" that essentially determines whether the invite was sent to an external user, or requested by an external user. This means the API and controller is a bit more clunky.
