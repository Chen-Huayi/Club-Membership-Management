package com.serverspringboot.service;


import com.mongodb.client.result.UpdateResult;
import com.serverspringboot.models.Member;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Slf4j
@Service
public class MemberService {
    /**
     * 设置集合名称
     */
    private static final String COLLECTION_NAME = "members";

    @Resource
    private MongoTemplate mongoTemplate;

    /**
     * 查询集合中的【全部】文档数据
     * @return 全部文档列表
     */
    public Object findAll() {
        // 执行查询集合中全部文档信息
        List<Member> documentList=mongoTemplate.findAll(Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 根据【文档ID】查询集合中文档数据
     * @return 文档信息
     */
    public Object findById() {
        // 设置查询的文档 ID
        String id = "1";
        // 根据文档ID查询集合中文档数据，并转换为对应 Java 对象
        Member member = mongoTemplate.findById(id, Member.class, COLLECTION_NAME);
        // 输出结果
        log.info("用户信息：{}", member);
        return member;
    }

    /**
     * 根据【条件】查询集合中【符合条件】的文档，只取【第一条】数据
     * @return 符合条件的第一条文档
     */
    public Member findOne(String key, Object value) {
        // 创建条件对象
        Criteria criteria = Criteria.where(key).is(value);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询一条文档，如果查询结果中有多条文档，那么就取第一条
        Member member = mongoTemplate.findOne(query, Member.class, COLLECTION_NAME);
        // 输出结果
        log.info("用户信息：{}", member);
        return member;
    }

    public Member findByMemberId(String member_id) {
        // 创建条件对象
        Criteria criteria = Criteria.where("member_id").is(member_id);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询一条文档，如果查询结果中有多条文档，那么就取第一条
        Member member = mongoTemplate.findOne(query, Member.class, COLLECTION_NAME);
        // 输出结果
        log.info("用户信息：{}", member);
        return member;
    }

    /**
     * 根据【条件】查询集合中【符合条件】的文档，获取其【文档列表】
     * @return 符合条件的文档列表
     */
    public Object findByCondition(String key, Object value) {
        // 设置查询条件参数, 创建条件对象
        Criteria criteria = Criteria.where(key).is(value);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询并返回结果
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 更新集合中【匹配】查询到的第一条文档数据，如果没有找到就【创建并插入一个新文档】
     * @return 执行更新的结果
     */
    public Object updateMemberInfo(Member member) {
        // 创建条件对象
        Criteria criteria = Criteria.where("member_id").is(member.getMember_id());
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 创建更新对象,并设置更新的内容
        Update update = new Update();

        if (member.getFirstname()!=null)
            update.set("firstname", member.getFirstname());
        if (member.getMiddle_name()!=null)
            update.set("middle_name", member.getMiddle_name());
        if (member.getLastname()!=null)
            update.set("lastname", member.getLastname());
        if (member.getGender()!=null)
            update.set("gender", member.getGender());
        if (member.getBirthday_year()!=null)
            update.set("birthday_year", member.getBirthday_year());
        if (member.getBirthday_month()!=null)
            update.set("birthday_month", member.getBirthday_month());
        if (member.getBirthday_date()!=null)
            update.set("birthday_date", member.getBirthday_date());
        if (member.getAddress_line1()!=null)
            update.set("address_line1", member.getAddress_line1());
        if (member.getAddress_line2()!=null)
            update.set("address_line2", member.getAddress_line2());
        if (member.getAddress_line3()!=null)
            update.set("address_line3", member.getAddress_line3());
        if (member.getAddress_city()!=null)
            update.set("address_city", member.getAddress_city());
        if (member.getAddress_country()!=null)
            update.set("address_country", member.getAddress_country());
        if (member.getAddress_postalcode()!=null)
            update.set("address_postalcode", member.getAddress_postalcode());
        if (member.getEmail()!=null)
            update.set("email", member.getEmail());
        if (member.getPhone()!=null)
            update.set("phone", member.getPhone());
        if (member.getEffective_date()!=null)
            update.set("effective_date", member.getEffective_date());
        if (member.getExpire_date()!=null)
            update.set("expire_date", member.getExpire_date());
        if (member.getRecent_renewal_date()!=null)
            update.set("recent_renewal_date", member.getRecent_renewal_date());

        // 执行更新，如果没有找到匹配查询的文档，则创建并插入一个新文档
        UpdateResult result = mongoTemplate.updateFirst(query, update, Member.class, COLLECTION_NAME);
        // 输出结果信息
        String resultInfo = "匹配到" + result.getMatchedCount() + "条数据, 对第一条数据进行了更改";
        log.info("更新结果：{}", resultInfo);
        return resultInfo;
    }

    public Object updateMemberPassword(Member member) {
        // 创建条件对象
        if (member.getOldPassword().compareTo(member.getNewPassword())==0){
            return "新密码和旧密码一致!";
        }
        Criteria criteria = Criteria.where("member_id").is(member.getMember_id());
        String hashedPwd=findByMemberId(member.getMember_id()).getPassword();

        boolean isCorrect = BCrypt.checkpw(member.getOldPassword(), hashedPwd);

        if (isCorrect){
            // 创建查询对象，然后将条件对象添加到其中
            Query query = new Query(criteria);
            String newPassword = BCrypt.hashpw(member.getNewPassword(), BCrypt.gensalt(10));
            // 创建更新对象,并设置更新的内容
            Update update = new Update().set("password", newPassword);
            // 执行更新，如果没有找到匹配查询的文档，则创建并插入一个新文档
            UpdateResult result = mongoTemplate.updateFirst(query, update, Member.class, COLLECTION_NAME);
            // 输出结果信息
            String resultInfo = "匹配到" + result.getMatchedCount() + "条数据, 对第一条数据进行了更改";
            log.info("更新结果：{}", resultInfo);
            return resultInfo;
        }else {
            return "匹配到" + 0 + "条数据";
        }
    }

    /**
     * 根据【条件】查询集合中【符合条件】的文档，获取其【文档列表】并【排序】
     * @return 符合条件的文档列表
     */
    public Object findByConditionAndSort() {
        // 设置查询条件参数
        String sex = "男";
        String sort = "age";
        // 创建条件对象
        Criteria criteria = Criteria.where("sex").is(sex);
        // 创建查询对象，然后将条件对象添加到其中，然后根据指定字段进行排序
        Query query = new Query(criteria).with(Sort.by(sort));
        // 执行查询
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 根据【单个条件】查询集合中的文档数据，并【按指定字段进行排序】与【限制指定数目】
     * @return 符合条件的文档列表
     */
    public Object findByConditionAndSortLimit() {
        // 设置查询条件参数
        String sex = "男";
        String sort = "age";
        int limit = 2;
        // 创建条件对象
        Criteria criteria = Criteria.where("sex").is(sex);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria).with(Sort.by(sort)).limit(limit);
        // 执行查询
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 根据【单个条件】查询集合中的文档数据，并【按指定字段进行排序】与【并跳过指定数目】
     * @return 符合条件的文档列表
     */
    public Object findByConditionAndSortSkip() {
        // 设置查询条件参数
        String sex = "男";
        String sort = "age";
        int skip = 1;
        // 创建条件对象
        Criteria criteria = Criteria.where("sex").is(sex);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria).with(Sort.by(sort)).skip(skip);
        // 查询并返回结果
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 查询【存在指定字段名称】的文档数据
     * @return 符合条件的文档列表
     */
    public Object findByExistsField(String key) {
        // 设置查询条件参数
        String field = "sex";
        // 创建条件
        Criteria criteria = Criteria.where(key).exists(true);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询并返回结果
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 根据【AND】关联多个查询条件，查询集合中的文档数据
     * @return 符合条件的文档列表
     */
    public Object findByAndCondition() {
        // 设置查询条件参数
        String sex = "男";
        Integer age = 22;
        // 创建条件
        Criteria criteriaSex = Criteria.where("sex").is(sex);
        Criteria criteriaAge = Criteria.where("age").is(age);
        // 创建条件对象，将上面条件进行 AND 关联
        Criteria criteria = new Criteria().andOperator(criteriaSex, criteriaAge);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询并返回结果
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 根据【OR】关联多个查询条件，查询集合中的文档数据
     * @return 符合条件的文档列表
     */
    public Object findByOrCondition() {
        // 设置查询条件参数
        String sex = "男";
        int age = 22;
        // 创建条件
        Criteria criteriaSex = Criteria.where("sex").is(sex);
        Criteria criteriaAge = Criteria.where("age").is(age);
        // 创建条件对象，将上面条件进行 OR 关联
        Criteria criteria = new Criteria().orOperator(criteriaSex, criteriaAge);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询并返回结果
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 根据【IN】关联多个查询条件，查询集合中的文档数据
     * @return 符合条件的文档列表
     */
    public Object findByInCondition() {
        // 设置查询条件参数
        Integer[] ages = {20, 22, 25};
        // 创建条件
        List<Integer> ageList = Arrays.asList(ages);
        // 创建条件对象
        Criteria criteria = Criteria.where("age").in(ageList);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询并返回结果
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 根据【逻辑运算符】查询集合中的文档数据
     * @return 符合条件的文档列表
     */
    public Object findByOperator() {
        // 设置查询条件参数
        int min = 25;
        int max = 35;
        // 创建条件对象
        Criteria criteria = Criteria.where("age").gt(min).lte(max);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询并返回结果
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 根据【正则表达式】查询集合中的文档数据
     * @return 符合条件的文档列表
     */
    public Object findByRegex() {
        // 设置查询条件参数
        String regex = "^zh*";
        // 创建条件对象
        Criteria criteria = Criteria.where("name").regex(regex);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询并返回结果
        List<Member> documentList = mongoTemplate.find(query, Member.class, COLLECTION_NAME);
        // 输出结果
        for (Member member : documentList) {
            log.info("用户信息：{}", member);
        }
        return documentList;
    }

    /**
     * 统计集合中符合【查询条件】的文档【数量】
     * @return 符合条件的文档列表
     */
    public Object countNumber() {
        // 设置查询条件参数
        int age = 22;
        // 创建条件对象
        Criteria criteria = Criteria.where("age").is(age);
        // 创建查询对象，然后将条件对象添加到其中
        Query query = new Query(criteria);
        // 查询并返回结果
        long count = mongoTemplate.count(query, Member.class, COLLECTION_NAME);
        // 输出结果
        log.info("符合条件的文档数量：{}", count);
        return count;
    }

}