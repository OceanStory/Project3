class CreateDialogues < ActiveRecord::Migration[5.2]
  def change
    create_table :dialogues do |t|
      t.string :content

      t.timestamps
    end
  end
end
