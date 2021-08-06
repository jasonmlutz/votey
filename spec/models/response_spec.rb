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
require 'rails_helper'

RSpec.describe Response, type: :model do
  it { should validate_presence_of(:poll_id) }
  it { should validate_presence_of(:respondent_id) }

  it { should belong_to(:respondent).with_foreign_key(:respondent_id).class_name(:User)}
  it { should belong_to(:poll).with_foreign_key(:poll_id)}
  it { should have_many(:answers).with_foreign_key(:response_id)}
end
