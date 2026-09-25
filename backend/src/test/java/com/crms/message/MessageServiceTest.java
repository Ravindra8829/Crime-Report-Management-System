package com.crms.message;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MessageServiceTest {

    @Mock
    private MessageRepository messageRepository;

    @InjectMocks
    private MessageService messageService;

    @Test
    void getMessagesBetweenUsersUsesBothConversationDirections() {
        messageService.getMessagesBetweenUsers(1L, 2L);

        verify(messageRepository).findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
                1L, 2L, 1L, 2L);
    }

    @Test
    void markAsReadUpdatesMessageAndSavesIt() {
        Message message = new Message();
        message.setIsRead(false);
        when(messageRepository.findById(3L)).thenReturn(Optional.of(message));
        when(messageRepository.save(message)).thenReturn(message);

        Message result = messageService.markAsRead(3L);

        assertSame(message, result);
        assertTrue(message.getIsRead());
        verify(messageRepository).save(message);
    }

    @Test
    void markAsReadThrowsWhenMessageDoesNotExist() {
        when(messageRepository.findById(3L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> messageService.markAsRead(3L));

        assertEquals("Message not found", exception.getMessage());
        verify(messageRepository, never()).save(any());
    }

    @Test
    void getUnreadMessagesDelegatesToRepository() {
        messageService.getUnreadMessagesForUser(9L);

        verify(messageRepository).findByReceiverIdAndIsReadFalse(9L);
    }
}
