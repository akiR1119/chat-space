class ChangeNameToUsers < ActiveRecord::Migration[5.0]
  def change
    change_column(:users, :name, :string, null: false, unique: true, index: true)
  end
end
