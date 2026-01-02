import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Mirza Zain',
    email: 'mirzazain269@gmail.com',
    phone: '+92 315 0757174',
    location: 'Karachi, Sindh',
    title: 'Software Engineer',
    bio: 'Passionate developer with 5 years of experience in mobile and web development.',
  });

  const ProfileField = ({ icon, label, value, onChangeText }: any) => (
    <View style={{marginBottom: 20}}>
      <Text style={{fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8}}>
        {label}
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isEditing ? '#ffffff' : '#f9fafb',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: isEditing ? '#3b82f6' : '#e5e7eb'
      }}>
        <Ionicons name={icon} size={20} color="#6b7280" style={{marginRight: 12}} />
        {isEditing ? (
          <TextInput
            style={{flex: 1, fontSize: 16, color: '#111827'}}
            value={value}
            onChangeText={onChangeText}
            placeholder={label}
          />
        ) : (
          <Text style={{flex: 1, fontSize: 16, color: '#111827'}}>
            {value || 'Not set'}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#f9fafb'}}>
      {/* Profile Header */}
      <View style={{
        backgroundColor: '#3b82f6',
        paddingTop: 40,
        paddingBottom: 80,
        alignItems: 'center'
      }}>
        <View style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16
        }}>
          <Text style={{fontSize: 40, color: '#3b82f6'}}>
            {profile.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 4}}>
          {profile.name}
        </Text>
        <Text style={{fontSize: 16, color: '#dbeafe'}}>
          {profile.title}
        </Text>
      </View>

      {/* Profile Info Card */}
      <View style={{
        marginTop: -50,
        marginHorizontal: 16,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3
      }}>
        {/* Edit Button */}
        <View style={{alignItems: 'flex-end', marginBottom: 20}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsEditing(!isEditing)}
            style={{
              backgroundColor: isEditing ? '#10b981' : '#3b82f6',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Ionicons 
              name={isEditing ? 'checkmark' : 'pencil'} 
              size={18} 
              color="#ffffff" 
              style={{marginRight: 8}} 
            />
            <Text style={{color: '#ffffff', fontSize: 14, fontWeight: '600'}}>
              {isEditing ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        <ProfileField
          icon="person-outline"
          label="Full Name"
          value={profile.name}
          onChangeText={(text: string) => setProfile({...profile, name: text})}
        />

        <ProfileField
          icon="mail-outline"
          label="Email"
          value={profile.email}
          onChangeText={(text: string) => setProfile({...profile, email: text})}
        />

        <ProfileField
          icon="call-outline"
          label="Phone"
          value={profile.phone}
          onChangeText={(text: string) => setProfile({...profile, phone: text})}
        />

        <ProfileField
          icon="location-outline"
          label="Location"
          value={profile.location}
          onChangeText={(text: string) => setProfile({...profile, location: text})}
        />

        <ProfileField
          icon="briefcase-outline"
          label="Job Title"
          value={profile.title}
          onChangeText={(text: string) => setProfile({...profile, title: text})}
        />

        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8}}>
            Bio
          </Text>
          <View style={{
            backgroundColor: isEditing ? '#ffffff' : '#f9fafb',
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: isEditing ? '#3b82f6' : '#e5e7eb'
          }}>
            {isEditing ? (
              <TextInput
                style={{fontSize: 16, color: '#111827', minHeight: 80, textAlignVertical: 'top'}}
                value={profile.bio}
                onChangeText={(text) => setProfile({...profile, bio: text})}
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={{fontSize: 16, color: '#111827', lineHeight: 24}}>
                {profile.bio || 'Not set'}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={{padding: 16, marginTop: 20}}>
        <Text style={{fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16}}>
          Settings
        </Text>
        
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: '#ffffff',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="notifications-outline" size={24} color="#6b7280" />
            <Text style={{fontSize: 16, color: '#111827', marginLeft: 12}}>
              Notifications
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: '#ffffff',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="document-text-outline" size={24} color="#6b7280" />
            <Text style={{fontSize: 16, color: '#111827', marginLeft: 12}}>
              Resume
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: '#ffffff',
            padding: 16,
            borderRadius: 12,
            marginBottom: 32,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="settings-outline" size={24} color="#6b7280" />
            <Text style={{fontSize: 16, color: '#111827', marginLeft: 12}}>
              Preferences
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: '#fee2e2',
            padding: 16,
            borderRadius: 12,
            marginBottom: 40,
            borderWidth: 1,
            borderColor: '#fecaca',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="#dc2626" />
          <Text style={{fontSize: 16, color: '#dc2626', fontWeight: '600', marginLeft: 12}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
