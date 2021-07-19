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
require 'rails_helper'

RSpec.describe Poll, type: :model do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:author_id) }

  it { should belong_to(:author).class_name(:User)}
end
