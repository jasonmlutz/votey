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
class Poll < ApplicationRecord
  validates :title, :author_id, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  has_many :questions, foreign_key: :parent_poll_id, dependent: :destroy
  has_many :responses, foreign_key: :poll_id, dependent: :destroy
end
