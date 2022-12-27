package com.mongo.server.models;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "members")
@Data
public class Member {
    //    @Id
    public String member_id;//: {type: String, unique: true, required: true},
    public String user_role;//: {type: String, default: 'Club Member', required: true},
    public String firstname;//: {type: String, required: true},
    public String middle_name;//: {type: String, default: ''},
    public String lastname;//: {type: String, required: true},
    public String gender;//: {type: String, required: true},
    public String birthday_year;//: {type: String, required: true},
    public String birthday_month;//: {type: String, required: true},
    public String birthday_date;//: {type: String, required: true},
    public String address_line1;//: {type: String, required: true},
    public String address_line2;//: {type: String, default: ''},
    public String address_line3;//: {type: String, default: ''},
    public String address_city;//: {type: String, required: true},
    public String address_country;//: {type: String, required: true},
    public String address_postalcode;//: {type: String, required: true},
    public String email;//: {type: String, required: true},
    public String phone;//: {type: String, required: true},
    public String password;//: {type: String, required: true},
    public String oldPassword;//: {type: String, required: true},
    public String newPassword;//: {type: String, required: true},
    public int fail_login_count;//: {type: Number, default: 0},
    public String registered_date;//: {type: String, default: formatDateString(new Date()), required: true},  // The date the user is registered
    public String effective_date;//: {type: String, default: 'Never Effected', required: true},  // The membership becomes effective for the current or last period
    public String expire_date;//: {type: String, default: formatDateString(new Date()), required: true},  // The membership expires after this date
    public boolean membership_status;//: {type: Boolean, default: false, required: true},  // true for Active; false for Inactive
    public String recent_renewal_date;//: {type: String, default: 'Never renew', required: true},
    public boolean account_locked;//: {type: Boolean, default: false, required: true},  // password is wrong more than 5 times, lock immediately
    public String[] notifications;  // in-app email notification boxes
    public boolean has_card;//: {type: Boolean, default: false, required: true},  // true for members who have their member cards, false for who never have, or request a replacement of card

}
