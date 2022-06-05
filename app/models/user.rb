class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist
  #:recoverable, :rememberable, :validatable

  validates :email, format: URI::MailTo::EMAIL_REGEXP
  enum role: %i[user admin]

  has_many :posts
  has_many :memberships
  has_many :groups, through: :memberships
  has_many :requests, -> { where request: true}, class_name: 'Invite', foreign_key: 'external_user'
  has_many :invites, -> { where request: false }, class_name: 'Invite', foreign_key: 'external_user'

  def self.authenticate(email, password)
    user = User.find_for_authentication(email: email)
    user&.valid_password?(password) ? user : nil
  end
end
