# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE)
#  password_digest :string           not null
#  session_token   :string
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :user, class: 'User' do
    username {"fbot:user"}
    password {"good_password"}
    admin { "f" }
  end
  factory :admin, class: 'User' do
    username {"fbot:admin"}
    password {"great_password"}
    admin { "t" }
  end
end
