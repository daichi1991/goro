class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  has_many :items
  has_many :tests

  devise :database_authenticatable, :registerable, :confirmable

  def generate_jwt
    secret = 'my_secret'
    exp = 60.days.from_now.to_i
    payload = {id: id, exp: exp}
    # JWT.encode({id: id, exp: 60.days.from_now.to_i}, Rails.application.secrets.secret_key_base)
    JWT.encode payload, secret, 'HS256'
  end

end
