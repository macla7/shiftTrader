class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist
  #:recoverable, :rememberable, :validatable

  validates :email, format: URI::MailTo::EMAIL_REGEXP
  enum role: %i[user admin]

  has_one_attached :avatar

  has_many :posts
  has_many :memberships
  has_many :groups, through: :memberships
  has_many :requests, -> { where request: true}, class_name: 'Invite', foreign_key: 'external_user'
  has_many :invites, -> { where request: false }, class_name: 'Invite', foreign_key: 'external_user'
  has_many :sent_invites, -> { where request: false }, class_name: 'Invite', foreign_key: 'internal_user'
  has_many :likes
  has_many :bids
  has_many :notifications, -> { where actioned: nil }, foreign_key: 'recipient_id'
  has_many :notification_origins, foreign_key: 'notifier_id'

  after_commit :add_default_avatar, on: %i[create update]

  def self.authenticate(email, password)
    user = User.find_for_authentication(email: email)
    user&.valid_password?(password) ? user : nil
  end

  def avatar_url
    unless avatar.attached?
      add_default_avatar
    end

    return Rails.application.routes.url_helpers.url_for(avatar) 
  end

  def add_default_avatar
    return if avatar.attached?
    
    avatar.attach(
      io: File.open(Rails.root.join('app', 'assets', 'images', 'default_avatar.jpeg')),
      filename: 'default_avatar.jpeg',
      content_type: 'image/jpeg'
    )
  end
end
