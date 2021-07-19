# == Schema Information
#
# Table name: responses
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  poll_id       :integer          not null
#  respondent_id :integer          not null
#
class Response < ApplicationRecord
  validates :poll_id, :respondent_id, presence: true

  belongs_to :respondent, foreign_key: :respondent_id, class_name: :User
  belongs_to :poll, foreign_key: :poll_id
  has_many :answers, foreign_key: :response_id, dependent: :destroy
end
