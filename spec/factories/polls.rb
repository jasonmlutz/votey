# == Schema Information
#
# Table name: polls
#
#  id          :bigint           not null, primary key
#  description :string
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  author_id   :integer          not null
#
FactoryBot.define do
  factory :poll do
    
  end
end
