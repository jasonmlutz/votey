# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE)
#  password_digest :string
#  session_token   :string           not null
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :polls, foreign_key: :author_id, dependent: :destroy
  has_many :responses, foreign_key: :respondent_id, dependent: :destroy

  after_initialize :ensure_session_token

  def protect(protectedKeys = ["session_token", "password_digest"])
    output = {}
    self.attributes.keys.map do |key|
      output[key] = self[key] unless protectedKeys.include?(key)
    end
    output
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by username: username
    if user && user.is_password?(password)
      return user
    else
      return false
    end
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
