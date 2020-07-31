class User < ApplicationRecord
    validates :username, :password, :role, :presence => true
    validates :username, length: {minimum: 3}
    validates :username, uniqueness: true
    validates :password, length: {minimum: 3}
    has_secure_password
    has_many :tasks
    has_one :profile
    has_many :volunteers, foreign_key: :volunteer_id, class_name: 'Pending'
    has_many :seniors, through: :volunteers
    has_many :seniors, foreign_key: :seniors_id, class_name: 'Pending'
    has_many :volunteers, through: :seniors
    has_many :volunteers, foreign_key: :volunteer_id, class_name: 'Inprogress'
    has_many :seniors, foreign_key: :seniors_id, class_name: 'Inprogress'
    has_many :volunteers, foreign_key: :volunteer_id, class_name: 'Completed'
    has_many :seniors, foreign_key: :seniors_id, class_name: 'Completed'
    
end
