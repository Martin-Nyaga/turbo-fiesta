module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :user_id

    def connect
      self.user_id = find_user_id
    end

    private
      def find_user_id
        1
      end
  end
end
