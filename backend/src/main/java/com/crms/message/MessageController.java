package com.crms.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<Message>> getAllMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<Message> getMessageById(@PathVariable Long id) {
        return messageService.getMessageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        return ResponseEntity.ok(messageService.createMessage(message));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sender/{senderId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<Message>> getMessagesBySender(@PathVariable Long senderId) {
        return ResponseEntity.ok(messageService.getMessagesBySender(senderId));
    }

    @GetMapping("/receiver/{receiverId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<Message>> getMessagesByReceiver(@PathVariable Long receiverId) {
        return ResponseEntity.ok(messageService.getMessagesByReceiver(receiverId));
    }

    @GetMapping("/conversation/{user1Id}/{user2Id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(
            @PathVariable Long user1Id, @PathVariable Long user2Id) {
        return ResponseEntity.ok(messageService.getMessagesBetweenUsers(user1Id, user2Id));
    }

    @GetMapping("/unread/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<Message>> getUnreadMessagesForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(messageService.getUnreadMessagesForUser(userId));
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<Message> markAsRead(@PathVariable Long id) {
        try {
            Message message = messageService.markAsRead(id);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 