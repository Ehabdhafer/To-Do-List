<?php

namespace App\Notifications;

use Ichtrojan\Otp\Otp;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;


class forgetpassword extends Notification
{
    use Queueable;
    public $message;
    public $subject;
    public $fromEmail;
    public $mailer;
    private $otp;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->message = 'use the below code for resetting your password';
        $this->subject = 'Password Resetting';
        $this->fromEmail = "Ehab@Ehab";
        $this->mailer = 'smtp';
        $this->otp = new Otp;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $otp = $this->otp->generate($notifiable->email, 'numeric', 6, 1); // code => 6 digits, 1 min
        return (new MailMessage)
            ->mailer('smtp')
            ->subject($this->subject)
            ->greeting('Hello ' . $notifiable->name)
            ->line($this->message)
            ->line('code: ' . $otp->token);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
