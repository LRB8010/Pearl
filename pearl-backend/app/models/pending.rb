class Pending < ApplicationRecord
  belongs_to :volunteer, class_name: 'User'
  belongs_to :senior, class_name: 'User'
  belongs_to :task
end
