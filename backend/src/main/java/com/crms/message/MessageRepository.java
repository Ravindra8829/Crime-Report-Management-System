package com.crms.message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderId(Long senderId);
    List<Message> findByReceiverId(Long receiverId);
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
            Long senderId, Long receiverId, Long receiverId2, Long senderId2);
    List<Message> findByReceiverIdAndIsReadFalse(Long receiverId);
} 