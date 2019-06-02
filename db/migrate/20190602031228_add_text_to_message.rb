class AddTextToMessage < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :content, :string
    add_column :messages, :image, :string
    add_reference :messages, :user, foreign_key: true
    add_reference :messages, :group, foreign_key: true
  end
end
