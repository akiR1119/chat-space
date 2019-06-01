class AddGroupAndUserToGroupUsers < ActiveRecord::Migration[5.0]
  def change
    add_reference :group_users, :group, foreign_key: true
    add_reference :group_users, :user, foreign_key: true
  end
end
