class Task < ApplicationRecord
    belongs_to :user
    has_many :pending, dependent: :destroy
    has_many :volunteers, through: :pending
    has_many :seniors, through: :pending
    has_many :inprogress
    has_many :completed
    has_many :volunteers, through: :inprogress
    has_many :seniors, through: :inprogress
    has_many :volunteers, through: :completed
    has_many :seniors, through: :completed
end
