# == Schema Information
#
# Table name: facilities
#
#  id          :bigint           not null, primary key
#  address     :string           not null
#  description :text             not null
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Foreign Keys
#
#  owner_id  (id => users.id)
#
FactoryBot.define do
  factory :facility do
    address { "MyString" }
    name { "MyString" }
    description { "MyText" }
  end
end
