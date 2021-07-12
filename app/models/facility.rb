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
class Facility < ApplicationRecord
end
