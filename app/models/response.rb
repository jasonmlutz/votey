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
# Indexes
#
#  index_responses_on_poll_id_and_respondent_id  (poll_id,respondent_id) UNIQUE
#
class Response < ApplicationRecord
  validates :poll_id, :respondent_id, presence: true
  validates :poll_id, uniqueness: {scope: :respondent_id}

  belongs_to :respondent, foreign_key: :respondent_id, class_name: :User
  belongs_to :poll, foreign_key: :poll_id
  has_many :answers, foreign_key: :response_id, dependent: :destroy
end
