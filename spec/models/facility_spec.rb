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
require 'rails_helper'

RSpec.describe Facility, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
