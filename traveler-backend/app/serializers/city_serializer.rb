class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :must_see, :visited, :country_id
end
